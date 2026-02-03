import StyleDictionary from 'style-dictionary';

const buildPath = 'vue-app/src/styles/';

// Configuration du Bonus (Export JS/TS)
const tsPlatform = {
  transformGroup: 'js',
  buildPath: buildPath,
  files: [{
    destination: 'tokens.ts',
    format: 'javascript/es6'
  }]
};

// Configuration Thème Clair
const lightConfig = {
  source: ['tokens/**/*.json', '!tokens/color/dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: buildPath,
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: { 
          selector: ':root, [data-theme="light"]',
          outputReferences: true
        }
      }]
    },
    ts: tsPlatform
  }
};

// Configuration Thème Sombre
const darkConfig = {
  source: ['tokens/color/base.json', 'tokens/color/dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: buildPath,
      files: [{
        destination: 'variables-dark.css',
        format: 'css/variables',
        options: { 
          selector: '[data-theme="dark"]',
          outputReferences: true
        },
        filter: (token) => token.filePath && token.filePath.includes('dark.json')
      }]
    }
  }
};

// Exécution du build
async function run() {
  try {
    const sdLight = new StyleDictionary(lightConfig);
    await sdLight.buildAllPlatforms();
    console.log('Thème Clair + Tokens TS générés.');
    
    const sdDark = new StyleDictionary(darkConfig);
    await sdDark.buildAllPlatforms();
    console.log('Thème Sombre généré.');
    
    console.log(`\nTout est prêt dans : ${buildPath}`);
  } catch (e) {
    console.error('Erreur de build :', e);
  }
}

run();