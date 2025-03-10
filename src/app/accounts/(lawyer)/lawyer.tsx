"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="overflow-visible">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200" />
                  <div>
                    <h3 className="font-semibold text-lg">Caleb Josh Berandoy</h3>
                    <p className="text-sm text-gray-500">Senior Developer</p>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-600 text-2xl font-semibold">28</p>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-600 text-2xl font-semibold">12</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Notifications Card */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Notifications:</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[1, 2].map((index) => (
                  <div key={index} className="bg-white rounded-lg border p-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 text-sm">#{index}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">New Task Assigned</h4>
                        <p className="text-sm text-gray-500">You have been assigned a new task</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Cases Card */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Active Cases:</CardTitle>
                </div>
                <span className="text-purple-600 text-lg font-semibold">143</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[1, 2].map((index) => (
                  <div key={index} className="bg-white rounded-lg border p-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">#{index}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Case #{index}: Nalabay sa akong Asawa akong anak</h4>
                        <p className="text-sm text-gray-500">Priority: High</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}