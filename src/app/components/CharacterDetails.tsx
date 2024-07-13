import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetCharacterDetails from "../api/characters/useGetCharacterDetails";
import { LoadingSpinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  id: string;
}

const CharacterDetails = ({ id }: Props) => {
  const [getCharacter, { loading, error, data }] = useGetCharacterDetails(id);

  const renderContent = () => {
    if (loading)
      return (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner className="" />
        </div>
      );

    if (error)
      return (
        <div className="flex h-full items-center justify-center text-center text-red-500">
          <p>{error.message}</p>
        </div>
      );

    if (data)
      return (
        <DialogHeader>
          <DialogTitle className="mb-4">{data.character.name}</DialogTitle>
          <DialogDescription className="flex gap-4">
            <div className="flex flex-col gap-4 items-start shrink-0">
              <Image
                src={data.character.image}
                alt={data.character.name}
                width={80}
                height={80}
              />
              <Badge
                variant={
                  data.character.status === "Dead" ? "default" : "secondary"
                }
              >
                {data.character.status}
              </Badge>
            </div>
            <ScrollArea className="h-72 rounded-md border p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Episodes
              </h4>
              <ul>
                {data.character.episode.map((episode) => (
                  <li key={episode.id}>{episode.name}</li>
                ))}
              </ul>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      );

    return null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => getCharacter()}>View more</Button>
      </DialogTrigger>

      <DialogHeader>
        <DialogContent className="sm:max-w-[425px] min-h-[200px]">
          {renderContent()}
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};

export default CharacterDetails;
