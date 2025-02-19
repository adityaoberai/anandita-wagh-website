export function getPinkIcon(type) {
    switch (type) {
        case 'linkedin': return 'icon-linkedin'
        case 'behance': return 'icon-behance'
        case 'email': return 'icon-mail'
        default: return 'icon-external-link'
    }
}

export const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/anandita-wagh-71095020a/',
        type: 'linkedin'
    },
    {
        name: 'Email',
        url: 'mailto:ananditawagh.design@gmail.com',
        type: 'email'
    }
];

export const featureLinks = [
    {
        name: 'Connect with me on LinkedIn',
        url: 'https://www.linkedin.com/in/anandita-wagh-71095020a/',
        type: 'linkedin'
    },
    {
        name: 'View my previous works on Behance',
        url: 'https://www.behance.net/ananditavinash',
        type: 'behance'
    },
    {
        name: 'Commission designs for your brand',
        url: 'https://www.behance.net/ananditawagh/services',
        type: 'behance'
    },
    {
        name: 'View my resume',
        url: '/resume.pdf',
        type: 'figma'
    }
];