import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TermsOfService() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>Please read these terms carefully before using our service</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws
            and regulations. If you do not agree with any part of these terms, you may not use our service.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            You agree to use our service only for purposes that are permitted by these Terms and any applicable law,
            regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
            your account on our service.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property
            of our company and its licensors. The service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries.
          </p>

          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the
            service will immediately cease.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

