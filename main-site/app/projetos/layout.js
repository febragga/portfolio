import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Arquivo de projetos',
  description: 'Arquivo completo de projetos de Fernando Braga, organizado por natureza, tipologia, ano, status e local.',
  path: '/projetos',
})

export default function ProjetosLayout({ children }) {
  return children
}
