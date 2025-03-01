import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CookiePolicy() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Policy</CardTitle>
          <CardDescription>How we use cookies on our website</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>

          <h2>How we use cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>To enable certain functions of the website</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
          </ul>

          <h2>Types of cookies we use</h2>
          <p>
            We use both session and persistent cookies on our website. We use session cookies to keep you logged in as
            you move between pages. We use persistent cookies to remember your preferences and settings.
          </p>

          <h2>How to control cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed. If you do this, however, you may
            have to manually adjust some preferences every time you visit a site and some services and functionalities
            may not work.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

