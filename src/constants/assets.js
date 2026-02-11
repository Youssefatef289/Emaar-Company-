export const ICONS = {
  plus: '/image/download.svg',
  home1: '/image/download%20(1).svg',
  home2: '/image/download%20(2).svg',
  home3: '/image/download%20(3).svg',
}

export function getProjectTypeIcon(type) {
  if (type === 'سكني') return ICONS.home1
  if (type === 'تجاري') return ICONS.home3
  return ICONS.home2
}


