import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'

const IN_PRODUCTION = process.env.NODE_ENV === 'production'

const postcss = {
    plugins: [
        tailwindcss(),
        autoprefixer(),
        ...(IN_PRODUCTION ? [cssnano()] : []),
    ],
}

export default postcss
