"use client"

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { SearchBar } from '../components/SearchBar'
import { CVEList } from '../components/CVEList'
import { Sidebar } from '../components/Sidebar'
import { searchCVES } from '../api/actions'
import type { CVE } from '../types'

const defaultCves: CVE[] = [
  {
    name: 'CVE-2024-56377',
    severity: 5.4,
    api_last_modified: '2025-01-09T23:15:08.173000',
    api_created: '2025-01-09T23:15:08.173000',
    product_configurations: [],
    references: []
  },
  {
    name: 'CVE-2024-56376',
    severity: 5.4,
    api_last_modified: '2025-01-09T23:15:07.827000',
    api_created: '2025-01-09T23:15:07.827000',
    product_configurations: [],
    references: []
  },
  {
    name: 'CVE-2025-21385',
    severity: 8.8,
    api_last_modified: '2025-01-09T22:15:29.980000',
    api_created: '2025-01-09T22:15:29.980000',
    product_configurations: [],
    references: []
  }
]

export default function App() {
  const [cves, setCves] = useState<CVE[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSearch(query: string) {
    if (!query.trim()) {
      setCves(defaultCves)
      return
    }

    setIsLoading(true)
    try {
      const results = await searchCVES(query)
      if (results.error) {
        console.error(results.error)
        return
      }
      setCves(results.cves)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <SearchBar onSearch={handleSearch} />
            <button 
              className="p-2 border border-slate-800 rounded-md hover:bg-slate-800"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-200" />
            </button>
          </div>
          <CVEList 
            cves={cves}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}

