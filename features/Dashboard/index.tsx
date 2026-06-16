'use client'
import React from 'react'
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import LineChart from '@/components/Chart/LineChart'
import DonutChart from '@/components/Chart/DonutChart'
import ActivityList, { IActivityItem } from '@/components/ActivityList'
import PageLayout from '@/components/PageLayout'
import './styles.scss'

const trendData = [
   { day: 'Mon', users: 32, active: 24 },
   { day: 'Tue', users: 41, active: 30 },
   { day: 'Wed', users: 38, active: 27 },
   { day: 'Thu', users: 55, active: 42 },
   { day: 'Fri', users: 47, active: 35 },
   { day: 'Sat', users: 29, active: 20 },
   { day: 'Sun', users: 36, active: 28 },
]

const roleData = [
   { name: 'Admin', value: 8, color: 'var(--color-c-primary-50)' },
   { name: 'Manager', value: 14, color: 'var(--color-c-blue-50)' },
   { name: 'Supervisor', value: 16, color: 'var(--color-c-violet-50)' },
   { name: 'User', value: 12, color: 'var(--color-c-warning-50)' },
]

const activityItems: IActivityItem[] = [
   {
      id: 1,
      name: 'Budi Lestari',
      action: 'created a new user account',
      time: '2 minutes ago',
      avatarColor: 'var(--color-c-primary-60)',
   },
   {
      id: 2,
      name: 'Siti Wijaya',
      action: 'updated profile settings',
      time: '18 minutes ago',
      avatarColor: 'var(--color-c-blue-50)',
   },
   {
      id: 3,
      name: 'Ahmad Kirana',
      action: 'changed role to Manager',
      time: '1 hour ago',
      avatarColor: 'var(--color-c-violet-60)',
   },
   { id: 4, name: 'Dewi Saputra', action: 'deactivated account', time: '3 hours ago', avatarColor: 'var(--color-c-warning-60)' },
   { id: 5, name: 'Hendra Wati', action: 'reset password', time: '5 hours ago', avatarColor: 'var(--color-c-success-60)' },
]

const quickStats = [
   { label: 'New this week', value: '12', color: 'var(--color-c-primary-60)' },
   { label: 'Deactivated', value: '3', color: 'var(--color-c-destructive-60)' },
   { label: 'Pending review', value: '7', color: 'var(--color-c-warning-60)' },
   { label: 'Role changes', value: '5', color: 'var(--color-c-blue-60)' },
]

function DashboardPage() {
   return (
      <PageLayout breadcrumbs={[{ label: 'Dashboard' }]} pageTitle="Dashboard">
         <div className="dashboardOverview">
            {/* Welcome Banner */}
            <div className="dashboardOverview__welcome">
               <div className="welcome__text">
                  <div className="welcome__title">Good morning, Admin 👋</div>
                  <div className="welcome__sub">Here's what's happening in your logistics operations — 16 June 2026</div>
               </div>
            </div>

            {/* KPI Cards */}
            <div className="dashboardOverview__statGrid">
               <StatCard
                  title="Total Users"
                  value="50"
                  change={12}
                  icon={<Users size={20} />}
                  theme="primary"
                  description="Across all roles"
               />
               <StatCard
                  title="Active Users"
                  value="28"
                  change={8}
                  icon={<UserCheck size={20} />}
                  theme="success"
                  description="Currently active"
               />
               <StatCard
                  title="Inactive Users"
                  value="22"
                  change={-4}
                  icon={<Clock size={20} />}
                  theme="warning"
                  description="Awaiting activation"
               />
               <StatCard
                  title="Growth Rate"
                  value="24"
                  suffix="%"
                  change={6}
                  icon={<TrendingUp size={20} />}
                  theme="blue"
                  description="vs last month"
               />
            </div>

            {/* Charts Row */}
            <div className="dashboardOverview__chartGrid">
               <div className="dashboardCard">
                  <div className="dashboardCard__header">
                     <div className="dashboardCard__title">User Activity (7 days)</div>
                     <div className="dashboardCard__legend">
                        <span className="legend-dot" style={{ background: 'var(--color-c-primary-50)' }} /> Total
                        <span className="legend-dot" style={{ background: 'var(--color-c-blue-50)' }} /> Active
                     </div>
                  </div>
                  <LineChart
                     data={trendData}
                     xKey="day"
                     series={[
                        { key: 'users', color: 'var(--color-c-primary-50)', label: 'Total' },
                        { key: 'active', color: 'var(--color-c-blue-50)', label: 'Active' },
                     ]}
                     height={220}
                  />
               </div>

               <div className="dashboardCard">
                  <div className="dashboardCard__header">
                     <div className="dashboardCard__title">Role Distribution</div>
                  </div>
                  <DonutChart data={roleData} height={220} />
               </div>
            </div>

            {/* Bottom Row */}
            <div className="dashboardOverview__bottomGrid">
               <div className="dashboardCard">
                  <ActivityList items={activityItems} title="Recent Activity" />
               </div>

               <div className="dashboardCard">
                  <div className="dashboardCard__title" style={{ marginBottom: 16 }}>
                     Quick Stats
                  </div>
                  <div className="quickStats">
                     {quickStats.map((s) => (
                        <div key={s.label} className="quickStats__item">
                           <div className="quickStats__dot" style={{ background: s.color }} />
                           <div className="quickStats__label">{s.label}</div>
                           <div className="quickStats__value" style={{ color: s.color }}>
                              {s.value}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </PageLayout>
   )
}

export default DashboardPage
