import { useState } from 'react'
import { Search } from 'lucide-react'
interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(query)
      onSearch(query)
    }
  }

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <input 
        value={query}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Filter using AI (e.g. 'Show me all high priority bugs')" 
        className="w-full pl-8 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
    </div>
  )
}

