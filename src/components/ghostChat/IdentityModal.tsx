/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { useTheme } from '../../hooks/useTheme';
import { useState } from 'react';
import toast from "react-hot-toast";

interface IdentityModalProps {
  identity: { publicKey: string, fingerprint: string, name?: string };
  show: boolean;
  onAddContact: (pubKey: string, name?: string, topic?: string) => void;
  onHide: (show: boolean) => void;
  initialMode?: 'show';
}

export const IdentityModal = ({
  identity,
  show,
  onAddContact: _onAddContact,
  onHide,
  initialMode: _initialMode = 'show',
}: IdentityModalProps) => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const qrBgColor = resolvedTheme === 'dark' ? '#FFFFFF' : '#000000';
  const qrFgColor = resolvedTheme === 'dark' ? '#000000' : '#FFFFFF';

  const handleClose = () => {
    onHide(false);
  };

  const handleCopyInvite = () => {
    const topic = `comms-${identity.fingerprint}`;
    const payload = JSON.stringify({
      ver: 1,
      name: `USER-${identity.fingerprint.slice(0, 4)}`,
      pubKey: identity.publicKey,
      fp: identity.fingerprint,
      topic: topic
    });

    navigator.clipboard.writeText(payload);
    setCopied(true);
    toast.success('INVITE PACKET COPIED');
    setTimeout(() => setCopied(false), 2000);
  };

  const qrData = JSON.stringify({
    ver: 1,
    name: `USER-${identity.fingerprint.slice(0, 4)}`,
    pubKey: identity.publicKey,
    fp: identity.fingerprint,
    topic: `comms-${identity.fingerprint}`
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[60] backdrop-blur-sm flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-sm bg-xmr-surface border border-xmr-green rounded-sm p-4 relative shadow-[0_0_30px_rgba(0,255,65,0.2)]">

            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-xmr-dim hover:text-red-500 cursor-pointer transition-colors p-1 z-10"
            >
              <X size={20} />
            </button>

            <div className="flex gap-4 mb-6 justify-center font-mono text-sm text-xmr-green">
              {identity.name || "MY CODE"}
            </div>

            <div className="min-h-[300px] flex items-center justify-center rounded p-2">
              <div className="h-auto w-full max-w-[320px] flex flex-col items-center">
                <div className="p-3 w-full h-full bg-white flex flex-col items-center border border-xmr-border rounded-sm shadow-inner">
                  <QRCode
                    size={320}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrData}
                    viewBox={`0 0 256 256`}
                    fgColor={qrFgColor}
                    bgColor={qrBgColor}
                    level="M"
                  />
                </div>

                <p className="text-center text-xmr-green font-mono text-[10px] mt-3 mb-3 truncate w-full tracking-wider opacity-80 select-all">
                  {identity.fingerprint}
                </p>

                <button
                  onClick={handleCopyInvite}
                  className="w-full py-2 flex items-center justify-center gap-2 bg-xmr-green/10 border border-xmr-green/50 text-xmr-green text-xs font-mono rounded hover:bg-xmr-green hover:text-black transition-all cursor-pointer group"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'COPIED TO CLIPBOARD' : 'COPY INVITE PACKET'}
                </button>

                <p className="text-[9px] text-xmr-dim mt-2 text-center opacity-60">
                  Share this packet to establish<br />secure uplink frequency.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
