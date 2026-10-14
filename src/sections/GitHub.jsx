import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SiGithub } from 'react-icons/si';
import { Flame, Trophy, Star, Activity, GitFork } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useTheme } from '../context/ThemeContext';

const GITHUB_USERNAME = 'lensen-degife';

function useGitHubData(username) {
  const [data, setData] = useState({ stats: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [userRes, contribRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
          ),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=stars`
          ),
        ]);

        if (!userRes.ok || !contribRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const [userData, contribData, reposData] = await Promise.all([
          userRes.json(),
          contribRes.json(),
          reposRes.json(),
        ]);

        const contributions = contribData.contributions || [];
        const sortedAsc = [...contributions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        let startIdx = sortedAsc.length - 1;

        if (
          startIdx >= 0 &&
          sortedAsc[startIdx].date === today &&
          sortedAsc[startIdx].count === 0
        ) {
          startIdx--;
        }

        for (let i = startIdx; i >= 0; i--) {
          if (sortedAsc[i].count > 0) {
            currentStreak++;
          } else {
            break;
          }
        }

        let longestStreak = 0;
        let tempStreak = 0;
        for (const day of sortedAsc) {
          if (day.count > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
          } else {
            tempStreak = 0;
          }
        }

        const totalStars = Array.isArray(reposData)
          ? reposData.reduce(
              (sum, repo) => sum + (repo.stargazers_count || 0),
              0
            )
          : 0;

        if (!cancelled) {
          setData({
            stats: {
              totalContributions: contribData.total?.lastYear ?? 0,
              currentStreak,
              longestStreak,
              publicRepos: userData.public_repos ?? 0,
              totalStars,
            },
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setData({ stats: null, loading: false, error: err.message });
        }
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return data;
}

const statItems = [
  {
    key: 'totalContributions',
    label: 'Contributions',
    sublabel: 'Past year',
    icon: Activity,
  },
  {
    key: 'currentStreak',
    label: 'Current Streak',
    sublabel: 'days active',
    icon: Flame,
  },
  {
    key: 'longestStreak',
    label: 'Longest Streak',
    sublabel: 'best streak',
    icon: Trophy,
  },
  {
    key: 'publicRepos',
    label: 'Repositories',
    sublabel: 'public repos',
    icon: GitFork,
  },
  {
    key: 'totalStars',
    label: 'Stars Earned',
    sublabel: 'community stars',
    icon: Star,
  },
];

export default function GitHub() {
  const { stats, loading } = useGitHubData(GITHUB_USERNAME);
  const { theme } = useTheme();

  // Contribution graph theme
  const calendarTheme = {
    dark: ['#160830', '#c084fc'],
    light: ['#f3e8ff', '#9333ea'],
  };

  return (
    <section id="github" className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[130px] opacity-60 dark:opacity-35 -translate-x-1/4 pointer-events-none transition-colors duration-300" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open-source track record, consistency, and repository milestones"
        />

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
        >
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-5 bg-white/80 dark:bg-[#1d0642]/30 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/20 text-center hover:border-purple-300 dark:hover:border-purple-400 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 dark:hover:shadow-[0_0_20px_rgba(49,17,102,0.4)] transition-all duration-200"
              >
                <div className="inline-flex p-3 bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 rounded-xl mb-3 text-purple-700 dark:text-purple-300 shadow-sm">
                  <Icon size={20} />
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {loading ? (
                    <span className="inline-block w-10 h-7 bg-purple-100 dark:bg-white/10 rounded animate-pulse" />
                  ) : (
                    (stats?.[item.key] ?? '—')
                  )}
                </p>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1 leading-tight">
                  {item.label}
                </p>
                <p className="text-[11px] text-purple-600/80 dark:text-purple-300/70 font-light mt-0.5">
                  {item.sublabel}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contribution Calendar Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 bg-white/80 dark:bg-[#1d0642]/30 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-purple-500/20 shadow-xl shadow-purple-500/5 dark:shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-[#311166]/70 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300">
                <SiGithub size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  @{GITHUB_USERNAME}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Contributions on GitHub</p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 border border-purple-200 dark:bg-white/5 dark:hover:bg-[#311166] dark:border-purple-500/30 text-xs sm:text-sm font-medium dark:text-purple-300 dark:hover:text-white transition-all duration-200"
            >
              <span>View Profile</span>
              <span>→</span>
            </a>
          </div>

          {/* Calendar */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 flex justify-center">
            <div className="min-w-[680px] text-slate-800 dark:text-white">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                theme={calendarTheme}
                blockSize={13}
                blockMargin={4}
                fontSize={13}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
