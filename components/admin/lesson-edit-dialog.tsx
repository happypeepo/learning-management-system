'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface LessonEditDialogProps {
    lesson: {
        id: string
        title: string
        description?: string
        video_url?: string
        video_duration_seconds?: number
    } | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function LessonEditDialog({ lesson, open, onOpenChange, onSuccess }: LessonEditDialogProps) {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!lesson) return

        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const { error } = await supabase
            .from('lessons')
            .update({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                video_url: formData.get('video_url') as string,
                video_duration_seconds: parseInt(formData.get('duration') as string) * 60 || 0,
            })
            .eq('id', lesson.id)

        setLoading(false)

        if (error) {
            alert('Error updating lesson: ' + error.message)
        } else {
            onSuccess()
            onOpenChange(false)
        }
    }

    if (!lesson) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px] border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle className="font-black text-2xl">Edit Lesson</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title" className="font-bold">Title</Label>
                        <Input
                            id="edit-title"
                            name="title"
                            defaultValue={lesson.title}
                            required
                            className="border-2 border-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-description" className="font-bold">Description</Label>
                        <Textarea
                            id="edit-description"
                            name="description"
                            defaultValue={lesson.description || ''}
                            className="border-2 border-foreground min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-video-url" className="font-bold">Video URL</Label>
                        <Input
                            id="edit-video-url"
                            name="video_url"
                            defaultValue={lesson.video_url || ''}
                            placeholder="https://..."
                            className="border-2 border-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-duration" className="font-bold">Duration (minutes)</Label>
                        <Input
                            id="edit-duration"
                            name="duration"
                            type="number"
                            min="0"
                            defaultValue={lesson.video_duration_seconds ? Math.round(lesson.video_duration_seconds / 60) : 0}
                            className="border-2 border-foreground"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="border-4 border-foreground bg-primary text-primary-foreground font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
