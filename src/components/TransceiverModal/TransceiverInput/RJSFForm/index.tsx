import BaseForm, { type FormProps } from "@rjsf/core"
import { type FieldTemplateProps, type FormContextType, type RJSFSchema, type StrictRJSFSchema } from "@rjsf/utils"
import { Form } from "react-bootstrap"

const titleize = (label: string): string => label
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .split(" ")
  .map((labelPart) => labelPart.charAt(0).toUpperCase() + labelPart.slice(1))
  .join(" ")

const FieldTemplate = <T, S extends StrictRJSFSchema, F extends FormContextType>({ style, id, label, description, children, errors, help }: FieldTemplateProps<T, S, F>) => {
  return <Form.Group className="mb-3" controlId={id} style={style}>
    {label && <Form.Label>{titleize(label)}</Form.Label>}
    {children}
    {errors}
    {description && <Form.Text>{description}</Form.Text>}
    {help && <Form.Text>{help}</Form.Text>}
  </Form.Group>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RJSFForm = <T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(props: FormProps<T, S, F>) =>
    <BaseForm<T, S, F> {...props} tagName="div" templates={{ FieldTemplate: FieldTemplate<T, S, F> }} uiSchema={{"ui:submitButtonOptions": { norender: true  }}} />
