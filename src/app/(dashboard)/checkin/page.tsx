'use client'

import { useState } from 'react'
import { useRegisterCheckin, useCheckinByStudent } from '@/hooks/useCheckin'
import { CheckinResult } from '@/types/checkin.types'
import { PageTitle } from '@/components/layout/PageTitle'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckinHistory } from '@/components/checkin/CheckinHistory'

export default function CheckinPage() {
  const [studentId, setStudentId] = useState('')
  const [historyStudentId, setHistoryStudentId] = useState('')
  const [result, setResult] = useState<CheckinResult | null>(null)

  const registerCheckin = useRegisterCheckin()
  const { data: checkins } = useCheckinByStudent(historyStudentId)

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await registerCheckin.mutateAsync({ studentId })
    setResult(res)
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Check-in" subtitle="Registre a entrada dos alunos" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Registrar Check-in">
          <form onSubmit={handleCheckin} className="space-y-4">
            <Input
              label="ID do Aluno"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Digite o ID do aluno"
              required
            />
            <Button type="submit" isLoading={registerCheckin.isPending} className="w-full">
              Registrar
            </Button>
          </form>

          {result && (
            <div
              className={`mt-4 rounded-md p-4 ${
                result.authorized ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              <p className="font-semibold">
                {result.authorized ? '✅ Acesso Autorizado' : '❌ Acesso Negado'}
              </p>
              {result.reason && <p className="mt-1 text-sm">{result.reason}</p>}
            </div>
          )}
        </Card>

        <Card title="Histórico de Check-ins">
          <div className="mb-4">
            <Input
              label="ID do Aluno"
              value={historyStudentId}
              onChange={(e) => setHistoryStudentId(e.target.value)}
              placeholder="Buscar por ID do aluno"
            />
          </div>
          <CheckinHistory checkins={checkins || []} />
        </Card>
      </div>
    </div>
  )
}
