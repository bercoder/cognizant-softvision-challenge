export type Steps =
  | 'Entrevista inicial'
  | 'Entrevista técnica'
  | 'Oferta'
  | 'Asignación'
  | 'Rechazo'

export interface Candidate {
  id: string
  name: string
  step: Steps | string
  comments: string
}
