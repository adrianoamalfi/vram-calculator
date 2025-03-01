import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>How we collect, use, and protect your information</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create or modify your account, request
            on-demand services, contact customer support, or otherwise communicate with us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, such as to:</p>
          <ul>
            <li>Facilitate and improve your online experience</li>
            <li>Respond to your comments and questions and provide customer service</li>
            <li>
              Send you related information, including confirmations, invoices, technical notices, updates, security
              alerts, and support and administrative messages
            </li>
          </ul>

          <h2>Sharing of Information</h2>
          <p>
            We do not share personal information with companies, organizations, or individuals outside of our
            organization except in the following cases:
          </p>
          <ul>
            <li>With your consent</li>
            <li>For legal reasons</li>
            <li>To protect our rights, privacy, safety or property</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We use appropriate technical and organizational measures to protect the personal information that we collect
            and process about you. The measures we use are designed to provide a level of security appropriate to the
            risk of processing your personal information.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

