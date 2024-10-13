'use server'

export type Status = 'mail_sent' | 'validation_failed'

export type ContactSubmissionResponse = {
  contact_form_id: number
  invalid_fields: ({ idref: null | string } & Record<'error_id' | 'field' | 'message', string>)[]
  status: Status
} & Record<'into' | 'message' | 'posted_data_hash' | 'status', string>

export async function submitContactInfo({
  company,
  email,
  firstName,
  lastName,
  solutionInterest,
  title,
}: Record<'company' | 'email' | 'firstName' | 'lastName' | 'solutionInterest' | 'title', string>) {
  const formData = new FormData()
  const data = [
    ['_wpcf7', '2110'],
    ['_wpcf7_locale', 'en_CA'],
    ['_wpcf7_unit_tag', 'wpcf7-f2110-p2405-o1'],
    ['_wpcf7_version', '5.9.8'],
    ['first-name', firstName],
    ['last-name', lastName],
    ['company', company],
    ['email', email],
    ['solution-interest', solutionInterest],
    ['title', title],
  ]
  for (const [key, value] of data) formData.append(key, value)
  const response = await fetch(
    process.env.CONTACT_FORM_ENDPOINT ?? 'https://evenica.com/wp-json/contact-form-7/v1/contact-forms/2110/feedback',
    { body: formData, method: 'POST' },
  )
  return response.json() as unknown as ContactSubmissionResponse
}
