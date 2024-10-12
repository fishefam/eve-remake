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
  formData.append('_wpcf7', '2110')
  formData.append('_wpcf7_version', '5.9.8')
  formData.append('_wpcf7_locale', 'en_CA')
  formData.append('_wpcf7_unit_tag', 'wpcf7-f2110-p2405-o1')
  formData.append('first-name', firstName)
  formData.append('last-name', lastName)
  formData.append('title', title)
  formData.append('company', company)
  formData.append('solution-interest', solutionInterest)
  formData.append('email', email)
  const response = await fetch('https://evenica.com/wp-json/contact-form-7/v1/contact-forms/2110/feedback', {
    body: formData,
    method: 'POST',
  })
  return response.json() as unknown as ContactSubmissionResponse
}
