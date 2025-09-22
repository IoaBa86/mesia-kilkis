// src/components/PhotoReorder.tsx
"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, Save } from "lucide-react"

interface Photo {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  order: number
}

interface PhotoReorderProps {
  photos: Photo[]
  categoryId: string
  categoryName: string
  onReorder: (newOrder: Photo[]) => void
}

export default function PhotoReorder({ photos, categoryId, categoryName, onReorder }: PhotoReorderProps) {
  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setOrderedPhotos([...photos].sort((a, b) => a.order - b.order))
  }, [photos])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(orderedPhotos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setOrderedPhotos(items)
    setHasChanges(true)
  }

  const saveOrder = async () => {
    setSaving(true)
    
    try {
      const photoIds = orderedPhotos.map(photo => photo.id)
      
      const response = await fetch('/api/photos/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoIds,
          categoryId
        }),
      })

      if (response.ok) {
        setHasChanges(false)
        onReorder(orderedPhotos)
        
        // Show success message
        const event = new CustomEvent('showSuccess', { 
          detail: 'Η σειρά των φωτογραφιών ενημερώθηκε επιτυχώς!' 
        })
        window.dispatchEvent(event)
      } else {
        throw new Error('Failed to reorder photos')
      }
    } catch (error) {
      console.error('Error reordering photos:', error)
      
      // Show error message
      const event = new CustomEvent('showError', { 
        detail: 'Σφάλμα κατά την ενημέρωση της σειράς' 
      })
      window.dispatchEvent(event)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Αναδιάταξη Φωτογραφιών</CardTitle>
            <CardDescription>
              Σύρετε και αφήστε φωτογραφίες για αλλαγή σειράς στην κατηγορία "{categoryName}"
            </CardDescription>
          </div>
          {hasChanges && (
            <Button
              onClick={saveOrder}
              disabled={saving}
              className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Αποθήκευση..." : "Αποθήκευση Σειράς"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="photos">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-3 min-h-[200px] p-4 rounded-lg transition-colors ${
                  snapshot.isDraggingOver ? 'bg-primary-50 border-2 border-primary-300 border-dashed' : 'bg-gray-50'
                }`}
              >
                {orderedPhotos.map((photo, index) => (
                  <Draggable key={photo.id} draggableId={photo.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border transition-all ${
                          snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : 'hover:shadow-md'
                        }`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Image
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                            width={60}
                            height={60}
                            className="rounded object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{photo.title}</p>
                          <p className="text-sm text-gray-500">Θέση: {index + 1}</p>
                        </div>
                        
                        <div className="flex-shrink-0 text-sm text-gray-400">
                          #{index + 1}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {orderedPhotos.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Δεν υπάρχουν φωτογραφίες σε αυτή την κατηγορία
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}
