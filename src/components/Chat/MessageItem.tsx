import { useAuthStore } from "@/stores/authStore"
import { AudioAttachment, FileAttachment } from "@/types/Attachment"
import { Message } from "@/types/Message"
import { CheckCheck, EllipsisVertical, FileText, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dayjs from "dayjs"

type Props = {
    data: Message,
    onDelete: (messageId: number) => void
}

const FileMessage = ({ data }: { data: FileAttachment }) => (
    <div className="flex items-center">
        <a href={data.src} target="_blank">
            {data.content_type.startsWith('image/') ?
                <img
                    className="md:max-w-96 h-80 object-cover rounded-md"
                    src={data.src}
                    alt={data.name}
                />
                :
                data.content_type.startsWith('video/') ?
                    <video
                        className="max-w-96 h-80 object-cover rounded-md"
                        src={data.src}
                        controls
                    />
                    :
                    <div className="flex items-center gap-3.5 py-1 px-2.5">
                        <FileText className="size-7" />

                        <div>
                            <span className="font-bold">{`${data.name}.${data.extension}`}</span>
                            <p className="text-sm">
                                {data.size} • {data.content_type}
                            </p>
                        </div>
                    </div>
            }
        </a>
    </div>
)

const AudioMessage = ({ data }: { data: AudioAttachment }) => (
    <audio controls>
        <source src={data.src} type="audio/mpeg" />
    </audio>
)

export const MessageItem = ({ data, onDelete }: Props) => {
    const { user } = useAuthStore()

    return (
        <div className="flex gap-3 items-center">
            {data.from_user.id == user?.id &&
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="size-5 text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer -mt-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(data.id)}>
                            <Trash2 className="mr-2 size-4" />
                            <span>Deletar Mensagem</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }

            <div className="space-y-1">
                <div className={`max-w-xs sm:max-w-md py-2 px-3 ${data.from_user.id === user?.id ? 'bg-primary rounded-l-md rounded-ee-md text-primary-foreground' : 'bg-secondary rounded-r-md rounded-es-md text-slate-700 dark:text-slate-200'}`}>
                    <div className="space-y-3">
                        {data.attachment?.file ?
                            <FileMessage
                                data={data.attachment.file}
                            />
                            : data.attachment?.audio ?
                                <AudioMessage
                                    data={data.attachment.audio}
                                />
                                : ''
                        }

                        {data.body && <p className="text-[15px] break-words">{data.body}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between px-1 gap-6 select-none">
                    <small className="text-slate-600 dark:text-slate-400 font-semibold">
                        {dayjs(data.created_at).format('DD/MM/YYYY [às] HH:mm')}
                    </small>

                    {data.from_user.id == user?.id &&
                        <CheckCheck
                            className={`size-5 duration-700 ${data.viewed_at ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}
                        />
                    }
                </div>
            </div>
        </div>
    )
}