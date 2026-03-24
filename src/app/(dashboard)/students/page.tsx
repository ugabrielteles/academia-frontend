'use client'

import { useState } from 'react'
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/hooks/useStudents'
import { Student, CreateStudentDto } from '@/types/student.types'
import { PageTitle } from '@/components/layout/PageTitle'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { StudentForm } from '@/components/students/StudentForm'
import { StudentTable } from '@/components/students/StudentTable'
import { Spinner } from '@/components/ui/Spinner'

export default function StudentsPage() {
  const { data: students, isLoading } = useStudents()
  const createStudent = useCreateStudent()
  const updateStudent = useUpdateStudent()
  const deleteStudent = useDeleteStudent()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const handleOpenCreate = () => {
    setSelectedStudent(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedStudent(null)
  }

  const handleSubmit = async (data: CreateStudentDto) => {
    if (selectedStudent) {
      await updateStudent.mutateAsync({ id: selectedStudent._id, dto: data })
    } else {
      await createStudent.mutateAsync(data)
    }
    handleClose()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este aluno?')) {
      await deleteStudent.mutateAsync(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle title="Alunos" subtitle="Gerencie os alunos da academia" />
        <Button onClick={handleOpenCreate}>Novo Aluno</Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <StudentTable
          students={students || []}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={selectedStudent ? 'Editar Aluno' : 'Novo Aluno'}
      >
        <StudentForm
          initialData={selectedStudent || undefined}
          onSubmit={handleSubmit}
          isLoading={createStudent.isPending || updateStudent.isPending}
        />
      </Modal>
    </div>
  )
}
