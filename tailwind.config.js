/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#ef4444',
            secondary: '#64748b',
            sidebarBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            sidebarHeader: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            sidebarAccent: '#ff6b35'
        },
        animation: {
            'slide-in': 'slideIn 0.3s ease-out',
            'fade-in': 'fadeIn 0.2s ease-out',
            'bounce-in': 'bounceIn 0.4s ease-out',
            'glow': 'glow 2s ease-in-out infinite alternate',
            'float': 'float 3s ease-in-out infinite',
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            slideIn: {
                '0%': { transform: 'translateX(-100%)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' }
            },
            fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' }
            },
            bounceIn: {
                '0%': { transform: 'scale(0.3)', opacity: '0' },
                '50%': { transform: 'scale(1.05)' },
                '70%': { transform: 'scale(0.9)' },
                '100%': { transform: 'scale(1)', opacity: '1' }
            },
            glow: {
                '0%': { boxShadow: '0 0 5px #ff6b35, 0 0 10px #ff6b35, 0 0 15px #ff6b35' },
                '100%': { boxShadow: '0 0 10px #ff6b35, 0 0 20px #ff6b35, 0 0 30px #ff6b35' }
            },
            float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' }
            }
        }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
