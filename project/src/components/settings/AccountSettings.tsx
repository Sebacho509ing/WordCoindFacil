import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Mail, User, Save, X } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface AccountSettingsProps {
  onClose: () => void;
}

interface SettingsFormInputs {
  email: string;
  username: string;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormInputs>({
    defaultValues: {
      email: auth.currentUser?.email || '',
      username: auth.currentUser?.displayName || '',
    },
  });

  const onSubmit = async (data: SettingsFormInputs) => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updates: Promise<void>[] = [];

      // Update email if changed
      if (data.email !== auth.currentUser.email) {
        updates.push(updateEmail(auth.currentUser, data.email));
      }

      // Update display name if changed
      if (data.username !== auth.currentUser.displayName) {
        updates.push(updateProfile(auth.currentUser, {
          displayName: data.username,
        }));
      }

      await Promise.all(updates);
      setSuccess('¡Perfil actualizado exitosamente!');
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-light rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Configuración de cuenta
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('username', {
                  required: 'El nombre de usuario es requerido',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres',
                  },
                })}
                className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido',
                  },
                })}
                className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="correo@ejemplo.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <div className="p-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded">
              {success}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};