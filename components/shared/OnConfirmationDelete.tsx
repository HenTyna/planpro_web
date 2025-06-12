import { Button } from "@/components/shared/ui/Button"
import { Trash2 } from "lucide-react"

interface OnConfirmationDeleteProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const OnConfirmationDelete = ({
  show,
  onConfirm,
  onClose,
  title = "",
  description = "",
}: OnConfirmationDeleteProps) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-red-500 p-4 text-white">
          <h2 className="text-xl font-semibold">
            Confirmation Delete {title && <span>{title}</span>}
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
            {description && (
              <p className="text-center text-gray-700">
                {description}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                onConfirm()
                onClose()
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}