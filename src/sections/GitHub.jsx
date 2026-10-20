import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SiGithub } from 'react-icons/si';
import { Flame, Trophy, Star, Activity, GitFork } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useTheme } from '../context/ThemeContext';
import { NetworkLines, FloatingDiamond, FloatingRing, SparkleStar } from '../components/Decorations';

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
    dark: ['#141419', '#a855f7'],
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
    <section id="github" className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#030305] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Background glow - hidden/dimmed on mobile in dark mode */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-purple-200/50 dark:bg-[#16062e] opacity-30 sm:opacity-50 dark:opacity-0 sm:dark:opacity-20 rounded-full blur-[80px] sm:blur-[130px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      {/* --- MODERN DECORATIONS --- */}
      <NetworkLines
        position="top-left"
        variant="corner"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.2}
      />
      <NetworkLines
        position="bottom-right"
        variant="matrix"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.3}
      />

      <FloatingDiamond
        className="top-16 right-[7%] sm:right-[10%]"
        size="md"
        delay={0.6}
      />

      <FloatingRing
        className="bottom-16 left-[5%] sm:left-[8%]"
        size="md"
        delay={1.1}
      />

      <SparkleStar
        className="top-1/3 left-[4%] sm:left-[8%]"
        size="sm"
        delay={1.8}
      />
      <SparkleStar
        className="bottom-1/3 right-[6%] sm:right-[9%]"
        size="md"
        delay={0.9}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          icon={SiGithub}
          badge="Open Source & Activity"
          title="GitHub Activity"
          subtitle="My open-source track record, consistency, and repository milestones"
        />

        {/* Stats Grid with Sequential Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
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
                className={`p-3.5 sm:p-5 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md rounded-2xl border border-purple-100 dark:border-white/10 text-center hover:border-purple-300 dark:hover:border-white/20 shadow-lg shadow-purple-500/5 transition-all duration-200 cursor-default ${
                  index === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <div className="inline-flex p-2.5 sm:p-3 bg-purple-100 dark:bg-white/[0.06] border border-purple-200 dark:border-white/10 rounded-xl mb-2 sm:mb-3 text-purple-700 dark:text-purple-300 shadow-sm">
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
                <p className="text-[10px] sm:text-[11px] text-purple-600/80 dark:text-slate-400 font-light mt-0.5">
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
          viewport={{ once: false, amount: 0.15 }}
          className="p-4 sm:p-8 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-100 dark:border-white/10 shadow-xl shadow-purple-500/5"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-white/[0.06] border border-purple-200 dark:border-white/10 flex items-center justify-center text-purple-700 dark:text-purple-300 flex-shrink-0">
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
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 border border-purple-200 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:border-white/10 text-xs sm:text-sm font-medium dark:text-slate-200 dark:hover:text-white transition-all duration-200"
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
          <p className="text-[11px] text-purple-600/70 dark:text-slate-400 text-center mt-2.5 block lg:hidden font-light">
            ← Scroll horizontally to explore full year activity →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
