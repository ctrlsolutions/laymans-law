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
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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