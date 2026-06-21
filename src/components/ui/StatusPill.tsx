import { Circle } from 'lucide-react'

type Props = {
  label: string
}

export function StatusPill({ label }: Props) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
      <Circle className="h-2.5 w-2.5 fill-emerald-500 text-emerald-500" />
      {label}
    </div>
  )
}
