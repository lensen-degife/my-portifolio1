import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SiGithub } from 'react-icons/si';
import { Flame, Trophy, Star, Activity, GitFork } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SectionHeading from '../components/SectionHeading';

const GITHUB_USERNAME = 'lensen-degife';

// ---------------------------------------------------------------------------
// Custom hook — fetches GitHub profile, repos, and contribution stats
// ---------------------------------------------------------------------------
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

        // --- Calculate streaks from contribution data ----------------------
        const contributions = contribData.contributions || [];
        const sortedAsc = [...contributions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Current streak: walk backwards from today
        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        let startIdx = sortedAsc.length - 1;

        // If today has 0 contributions, start from yesterday (day isn't over)
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

        // Longest streak
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

        // Total stars across all public repos
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

// ---------------------------------------------------------------------------
// Stat card definitions
// ---------------------------------------------------------------------------
const statItems = [
  {
    key: 'totalContributions',
    label: 'Contributions',
    sublabel: 'Past year',
    icon: Activity,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    key: 'currentStreak',
    label: 'Current Streak',
    sublabel: 'days',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
  },
  {
    key: 'longestStreak',
    label: 'Longest Streak',
    sublabel: 'days',
    icon: Trophy,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
  {
    key: 'publicRepos',
    label: 'Repositories',
    sublabel: 'public',
    icon: GitFork,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
  },
  {
    key: 'totalStars',
    label: 'Stars Earned',
    sublabel: 'total',
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-500/10',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function GitHub() {
  const { theme } = useTheme();
  const { stats, loading } = useGitHubData(GITHUB_USERNAME);

  // Indigo-tinted contribution graph to match the portfolio accent
  const calendarTheme = {
    dark: ['#161b22', '#818cf8'],
    light: ['#ebedf0', '#4338ca'],
  };

  return (
    <section id="github" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open-source journey and coding consistency"
        />

        {/* ---- Stats Grid ------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
        >
          {statItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-center hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors duration-200"
            >
              <div
                className={`inline-flex p-2.5 ${item.bg} rounded-lg mb-3`}
              >
                <item.icon size={20} className={item.color} />
              </div>

              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block w-10 h-7 bg-slate-200 dark:bg-dark-elevated rounded animate-pulse" />
                ) : (
                  (stats?.[item.key] ?? '—')
                )}
              </p>

              <p className="text-xs text-slate-500 mt-1 leading-tight">
                {item.label}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-600">
                {item.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- Contribution Calendar ------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="p-5 sm:p-6 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SiGithub
                size={20}
                className="text-slate-700 dark:text-slate-300"
              />
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                @{GITHUB_USERNAME}
              </h3>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View profile →
            </a>
          </div>

          {/* Calendar — horizontally scrollable on small screens */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="min-w-[680px]">
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
