import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Merged translations for Ghost Chat desktop (English only for now)
const en = {
  system: {
    comms: "COMMS",
    identityUpdated: "Identity updated",
    secureUplinkEstablished: "Secure uplink established",
    frequencySynced: "Frequency synced",
    contactAlreadyExists: "Contact already exists",
    invalidPgpBlock: "Invalid PGP block",
    noUplinks: "No uplinks",
    exitTerminal: "Exit terminal",
    exit: "EXIT",
    encrypted: "Encrypted",
    online: "Online",
    systemPurge: "SYSTEM PURGE",
    deleteIdentityOnly: "Identity removed, contacts kept",
    keepContacts: "KEEP CONTACTS",
    channelWaiting: "AWAITING CHANNEL",
    invitePacketCopied: "Invite packet copied",
    keyAddedManually: "Key added manually",
    encryptedAndCopied: "Encrypted & copied",
    clipboardAccessDenied: "Clipboard access denied",
  },
  ghostChat: {
    pastePrivateKey: "Paste your private key here...",
    passphrase: "Passphrase (if encrypted)",
    paste: "PASTE",
    pasteInvitePacket: "Paste invite packet or public key...",
  },
  alerts: {
    deleteConfirm: "Delete this contact?",
  },
  actions: {
    scanQr: "Scan QR code",
    addContact: "Add contact",
    showMyQr: "Show my QR code",
    copyKey: "Copy key",
    destroySession: "Destroy session",
    exitTerminal: "Exit terminal",
    exit: "EXIT",
    paste: "Paste",
  },
  tooltips: {
    clickToCopyId: "Click to copy ID",
  },
  errors: {
    generic: "An error occurred",
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
    },
    defaultNS: 'common',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  })

export default i18n
