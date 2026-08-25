import { createSocialImage, socialImageSize } from '@/lib/social-image'

export const alt = 'Fernando Braga — Arquitetura, urbanismo e visualização'
export const size = socialImageSize
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return createSocialImage({
    eyebrow: 'Portfólio de arquitetura',
    title: 'Arquitetura, computação e representação.',
    detail: 'Projetos entre desenho técnico, visualização, urbanismo e investigação espacial.',
  })
}
