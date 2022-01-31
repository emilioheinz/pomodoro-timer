import { i18n } from 'next-i18next'
import IntlNamespaces from '~/enums/intl-namespaces'

const loadNamespace = async (locale: string, namespace: IntlNamespaces) => {
  const resources = await fetch(`/locales/${locale}/${namespace}.json`)
  i18n?.addResourceBundle(locale, namespace, resources.json(), true)
}

const loadGlobalIntlNamespaces = (locale: string) => {
  loadNamespace(locale, IntlNamespaces.toast)
}

const i18nConfig = {
  loadGlobalIntlNamespaces
}

export default i18nConfig
