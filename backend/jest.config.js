/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest', // Utiliser le preset ts-jest
  testEnvironment: 'node', // Environnement de test
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transformation pour TypeScript
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Extensions reconnues
  testMatch: ['**/tests/**/*.test.ts'], // Chemin vers les fichiers de test
  clearMocks: true, // Nettoyer les mocks après chaque test
  coverageDirectory: 'coverage', // Dossier pour la couverture des tests
  collectCoverage: false, // Activer la couverture
  collectCoverageFrom: [
    'src/**/*.ts', // Cibler les fichiers TS pour la couverture
    '!src/**/*.d.ts', // Exclure les fichiers de définition de types
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Mapper les alias pour src
  },
};
