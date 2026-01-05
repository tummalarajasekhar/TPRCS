export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
          <p className="text-gray-500">Here is what's happening with your courses today.</p>
        </div>
        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
          Active Student
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Enrolled Courses" value="2" color="bg-blue-500" />
        <StatCard title="Hours Learned" value="14.5" color="bg-emerald-500" />
        <StatCard title="Certificates" value="0" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Courses List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Continue Learning</h3>

          {/* Active Course Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
            <div className="h-24 w-24 bg-gray-200 rounded-lg flex-shrink-0"></div> {/* Thumbnail */}
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">MERN Stack Development</h4>
              <p className="text-sm text-gray-500 mb-3">Offline Batch • Guntur Brodipet</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>45% Completed</span>
                <span>Next Class: Tomorrow 10 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Messages / Notifications Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Notice Board</h3>
          <div className="space-y-4">
            <NotificationItem
              type="urgent"
              title="Class Rescheduled"
              date="Today, 9:00 AM"
              desc="The Offline Java class in Brodipet is shifted to 11 AM today."
            />
            <NotificationItem
              type="info"
              title="New Material Added"
              date="Yesterday"
              desc="React hooks PDF notes have been uploaded to your portal."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for Dashboard
function StatCard({ title, value, color }: { title: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`h-10 w-2 rounded-full ${color}`}></div>
    </div>
  );
}

function NotificationItem({ type, title, desc, date }: { type: 'urgent' | 'info', title: string, desc: string, date: string }) {
  return (
    <div className={`p-3 rounded-lg border-l-4 ${type === 'urgent' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
      <div className="flex justify-between items-start">
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{desc}</p>
    </div>
  );
}