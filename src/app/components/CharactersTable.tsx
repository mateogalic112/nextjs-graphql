"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCharacters } from "../api/characters/useGetCharacters";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const CharactersTable = () => {
  const [page, setPage] = useState(1);

  const { data, previousData, loading } = useGetCharacters(page);

  const prevDisabled = !data?.characters.info.prev;
  const nextDisabled =
    !data?.characters.info.next ||
    data?.characters.info.next > data?.characters.info.pages;

  const results =
    (loading ? previousData?.characters.results : data?.characters.results) ??
    [];

  return (
    <div className="flex flex-col justify-center gap-8 max-w-screen-lg w-full">
      <Table
        className={`${loading && previousData ? "opacity-50" : "opacity-100"}`}
      >
        <TableCaption>Characters</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((character) => (
            <TableRow key={character.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={character.image} />
                    <AvatarFallback>{character.name[0]}</AvatarFallback>
                  </Avatar>

                  <h3 className="text-sm font-bold">{character.name}</h3>
                </div>
              </TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.origin.name ?? "Unknown"}</TableCell>
              <TableCell>{character.location.name ?? "Unknown"}</TableCell>
              <TableCell className="text-right">
                <Button>View more</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              className={prevDisabled ? "opacity-50" : ""}
              disabled={prevDisabled}
              onClick={() => {
                if (!prevDisabled) {
                  setPage((prev) => prev - 1);
                }
              }}
            >
              Prev
            </Button>
          </PaginationItem>
          <PaginationItem>
            <p className="px-4">{page}</p>
          </PaginationItem>
          <PaginationItem>
            <Button
              className={nextDisabled ? "opacity-50" : ""}
              disabled={nextDisabled}
              onClick={() => {
                if (!nextDisabled) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CharactersTable;