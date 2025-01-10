import { Circle, AlertCircle, Clock } from 'lucide-react'
import type { CVE } from '../types'

interface CVEListProps {
  cves: CVE[]
  isLoading?: boolean
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function getSeverityColor(severity: number) {
  const score = severity ?? 0
  if (score >= 9.0) {
    return {
      container: 'text-red-400 border-red-400',
      icon: 'fill-red-400'
    }
  } else if (score >= 7.0) {
    return {
      container: 'text-orange-400 border-orange-400',
      icon: 'fill-orange-400'
    }
  } else if (score >= 4.0) {
    return {
      container: 'text-yellow-400 border-yellow-400',
      icon: 'fill-yellow-400'
    }
  } else if (score >= 0.1) {
    return {
      container: 'text-green-400 border-green-400',
      icon: 'fill-green-400'
    }
  }
  return {
    container: 'text-slate-400 border-slate-400',
    icon: 'fill-slate-400'
  }
}

function getSeverityLabel(severity: number) {
  const score = severity ?? 0
  if (score >= 9.0) return 'Critical'
  if (score >= 7.0) return 'High'
  if (score >= 4.0) return 'Medium'
  if (score >= 0.1) return 'Low'
  return 'None'
}

function CVERow({ cve }: { cve: CVE }) {
  const severityColor = getSeverityColor(cve.severity)
  const severityLabel = getSeverityLabel(cve.severity)
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-300">{cve.name}</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm border ${severityColor.container}`}>
            <Circle className={`mr-1 h-3 w-3 ${severityColor.icon}`} />
            {severityLabel} ({cve.severity?.toFixed(1) ?? '0.0'})
          </span>
        </div>
        
      </div>
      <div className="flex items-center gap-1 text-sm text-slate-500">
        <Clock className="h-3 w-3" />
        {formatDate(cve.api_last_modified)}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="h-[76px] rounded-lg border border-slate-800 bg-slate-900 animate-pulse" />
  )
}

export function CVEList({ cves, isLoading }: CVEListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }

  if (cves.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] rounded-lg border border-slate-800 bg-slate-900">
        <p className="text-slate-500">No cves found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cves.map((cve) => (
        <CVERow key={cve.name} cve={cve} />
      ))}
    </div>
  )
}

