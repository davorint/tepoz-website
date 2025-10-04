import { getContactSubmissions, markContactAsRead, markContactAsReplied } from '@/lib/actions/contact'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ContactSubmissionsClient from '@/components/admin/ContactSubmissionsClient'

export default async function ContactSubmissionsPage() {
  const result = await getContactSubmissions()
  const submissions = result.success ? result.submissions : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Contact Submissions</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Total submissions: {submissions.length}
        </p>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No submissions yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 dark:text-neutral-400">
              Contact form submissions will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <ContactSubmissionsClient submissions={submissions} />
      )}
    </div>
  )
}
