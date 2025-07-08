import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#38b2ac',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
      800: '#234e52',
      900: '#1d4044',
    },
    accent: {
      100: '#e3f0ff',
      200: '#b3d8ff',
      300: '#7bbaff',
      400: '#4796ff',
      500: '#2563eb',
      600: '#1e40af',
      700: '#1e3a8a',
    },
    purple: {
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a21caf',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-br, teal.50, blue.100, purple.50)',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'teal.500',
          color: 'white',
          _hover: { bg: 'teal.600' },
        },
        outline: {
          borderColor: 'teal.500',
          color: 'teal.600',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'teal.700',
        fontWeight: 'extrabold',
      },
    },
    Card: {
      baseStyle: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'lg',
        p: 6,
      },
    },
  },
});

export default theme; 