# Contribuir a Cocina Deliciosa

¡Gracias por tu interés en contribuir a Cocina Deliciosa! 🎉

## Código de Conducta

Este proyecto sigue el [Código de Conducta de Contributor Covenant](https://www.contributor-covenant.org/). Al participar, te comprometes a mantener un ambiente acogedor y respetuoso.

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado anteriormente
2. Usa el template de issue para bugs
3. Incluye información detallada sobre tu entorno
4. Proporciona pasos para reproducir el problema

### Sugerir Nuevas Funcionalidades

1. Revisa las issues existentes para evitar duplicados
2. Usa el template de feature request
3. Describe claramente el problema que resuelve
4. Incluye mockups o ejemplos si es posible

### Enviar Pull Requests

1. **Fork** el repositorio
2. Crear una **nueva rama** desde `main`
3. Hacer tus **cambios** siguiendo las convenciones
4. **Testear** tus cambios
5. **Commit** con mensajes descriptivos
6. **Push** y crear un Pull Request

## Convenciones

### Git Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new search filters
fix(api): resolve CORS issues in development
docs(readme): update installation instructions
style(ui): improve button hover animations
refactor(hooks): optimize useRecipes performance
test(search): add unit tests for SearchBar component
```

### Estructura de Branches

- `main` - Código de producción
- `develop` - Desarrollo activo
- `feature/feature-name` - Nuevas funcionalidades
- `bugfix/bug-description` - Corrección de bugs
- `hotfix/critical-fix` - Fixes críticos

### Código JavaScript/React

```javascript
// ✅ Bueno
const RecipeCard = ({ recipe, onRecipeClick }) => {
  const handleClick = useCallback(() => {
    onRecipeClick(recipe.id);
  }, [recipe.id, onRecipeClick]);

  return (
    <Card onClick={handleClick}>
      <h3>{recipe.name}</h3>
    </Card>
  );
};

// ❌ Evitar
function RecipeCard(props) {
  return (
    <div onClick={() => props.onRecipeClick(props.recipe.id)}>
      <h3>{props.recipe.name}</h3>
    </div>
  );
}
```

### CSS

```css
/* ✅ Bueno - BEM Methodology */
.recipe-card {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.recipe-card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

.recipe-card--featured {
  border: 2px solid var(--primary);
}

/* ❌ Evitar */
.recipeCard {
  padding: 16px;
}

.title {
  font-size: 18px;
}
```

## Setup de Desarrollo

```bash
# Clonar tu fork
git clone https://github.com/GianSandoval5/cocina_deliciosa.git

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Ejecutar tests
npm run test

# Linting
npm run lint
```

## Herramientas de Desarrollo

- **VS Code Extensions recomendadas:**
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Auto Rename Tag
  - Bracket Pair Colorizer

## Testing

- Escribir tests para nuevas funcionalidades
- Mantener coverage > 80%
- Usar React Testing Library para componentes
- Jest para lógica de negocio

```javascript
// Ejemplo de test
describe('SearchBar', () => {
  test('should call onSearch when user types', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/buscar recetas/i);
    await userEvent.type(input, 'pasta');

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('pasta');
    });
  });
});
```

## Proceso de Review

1. **Automated checks** deben pasar
2. **Manual review** por al menos un maintainer
3. **Tests** deben mantener coverage
4. **Documentation** actualizada si es necesario

## Reconocimientos

Los contribuidores serán añadidos al README y recibirán reconocimiento por sus aportes.

¡Gracias por hacer que Cocina Deliciosa sea mejor! 🍳
