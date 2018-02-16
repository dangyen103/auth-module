import Auth from './auth'
import './middleware'

// Active chemes
<% for (let scheme of options.schemes) { %>import <%= 'scheme_' + hash(scheme) %> from '<%= scheme %>'<% } %>

export default function (ctx, inject) {
  // Options
  const options = <%= JSON.stringify(options.options) %>

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Inject it to nuxt context as $auth
  inject('auth', $auth)

  // Register strategies
  <% for (let strategyName in options.strategies) { const strategy = options.strategies[strategyName] %>
  $auth.registerStrategy('<%= strategyName %>', <%='scheme_' + hash(strategy._scheme)%>(<%= JSON.stringify(strategy) %>))
  <% } %>

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.browser) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}