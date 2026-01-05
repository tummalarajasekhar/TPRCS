import { Bell, AlertCircle, Info } from 'lucide-react';

export default function MessagesPage() {
    // Mock Data
    const messages = [
        { id: 1, type: 'urgent', title: "Class Cancelled Today", date: "2 hrs ago", body: "Due to heavy rain in Guntur, the Offline Brodipet batch is cancelled. Join online at 6 PM." },
        { id: 2, type: 'info', title: "New Material Uploaded", date: "Yesterday", body: "We have uploaded the React Interview Questions PDF to your course dashboard." },
        { id: 3, type: 'promo', title: "Early Bird Discount", date: "2 days ago", body: "Join the new Python batch for your friends with a 10% referral discount." },
    ];

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Messages</h1>
                <button className="text-sm text-indigo-600 hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`p-5 rounded-xl border flex gap-4 ${msg.type === 'urgent' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className={`mt-1 p-2 rounded-full h-fit ${msg.type === 'urgent' ? 'bg-red-200 text-red-700' : 'bg-blue-100 text-blue-600'}`}>
                            {msg.type === 'urgent' ? <AlertCircle size={20} /> : <Info size={20} />}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-semibold ${msg.type === 'urgent' ? 'text-red-900' : 'text-gray-900'}`}>{msg.title}</h3>
                                <span className="text-xs text-gray-500">{msg.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{msg.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}