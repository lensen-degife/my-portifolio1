import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  // Contribution graph theme
  const calendarTheme = {
    dark: ['#160830', '#c084fc'],
    light: ['#f3e8ff', '#9333ea'],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="github" className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Background glow with breathing animation */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[130px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open-source track record, consistency, and repository milestones"
        />

        {/* Stats Grid with Sequential Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={statItemVariants}
                whileHover={
                  shouldReduceMotion
                    ? false
                    : { y: -3, scale: 1.02 }
                }
                transition={{ duration: 0.2 }}
                className={`p-3.5 sm:p-5 bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/20 text-center hover:border-purple-300 dark:hover:border-purple-400 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/15 dark:hover:shadow-[0_0_20px_rgba(49,17,102,0.4)] transition-all duration-200 cursor-default ${
                  index === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <div className="inline-flex p-2.5 sm:p-3 bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 rounded-xl mb-2 sm:mb-3 text-purple-700 dark:text-purple-300 shadow-sm">
                  <Icon size={18} />
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {loading ? (
                    <span className="inline-block w-10 h-7 bg-purple-100 dark:bg-white/10 rounded animate-pulse" />
                  ) : (
                    (stats?.[item.key] ?? '—')
                  )}
                </p>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1 leading-tight">
                  {item.label}
                </p>
                <p className="text-[10px] sm:text-[11px] text-purple-600/80 dark:text-purple-300/70 font-light mt-0.5">
                  {item.sublabel}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contribution Calendar Container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          className="p-4 sm:p-8 bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-100 dark:border-purple-500/20 shadow-xl shadow-purple-500/5 dark:shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300 flex-shrink-0">
                <SiGithub size={18} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  @{GITHUB_USERNAME}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-light">Contributions on GitHub</p>
              </div>
            </div>
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 border border-purple-200 dark:bg-white/5 dark:hover:bg-[#311166] dark:border-purple-500/30 text-xs sm:text-sm font-medium dark:text-purple-300 dark:hover:text-white transition-all duration-200"
            >
              <span>View Profile</span>
              <span>→</span>
            </motion.a>
          </div>

          {/* Calendar - lg:flex lg:justify-center fixes mobile left-clipping overflow */}
          <div className="overflow-x-auto pb-3 -mx-2 px-2 lg:flex lg:justify-center">
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
          <p className="text-[11px] text-purple-600/70 dark:text-purple-300/60 text-center mt-2.5 block lg:hidden font-light">
            ← Scroll horizontally to explore full year activity →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
