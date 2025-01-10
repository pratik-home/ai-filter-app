import { Inbox, ListTodo, LayoutDashboard, Calendar, Users, Settings, Plus } from 'lucide-react'

const navigation = [
  { name: 'Inbox', icon: Inbox },
  { name: 'My CVEs', icon: ListTodo },
  { name: 'Views', icon: LayoutDashboard },
  { name: 'Roadmaps', icon: Calendar },
  { name: 'Teams', icon: Users },
  { name: 'Settings', icon: Settings },
]

export function Sidebar() {
  return (
    <div className="w-[250px] border-r border-slate-800 bg-slate-950">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] items-center border-b border-slate-800 px-4">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-200 hover:text-slate-50 hover:bg-slate-800 rounded-md">
            <Plus className="h-4 w-4" />
            New CVE
          </button>
        </div>
        <div className="flex-1 px-2 overflow-y-auto">
          <div className="space-y-2 py-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                className="w-full flex items-center gap-2 px-4 py-2 text-slate-200 hover:text-slate-50 hover:bg-slate-800 rounded-md"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

