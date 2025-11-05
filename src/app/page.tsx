
"use client";

import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import LogoutButton from "./logout";
import { Button } from "@/components/ui/button";
import { on } from "events";
import { toast } from "sonner";

export default function Home() {

  // await requireAuth();

  const trpc = useTRPC();

  const { data } = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient();

  const create = useMutation(trpc.createWorkflow.mutationOptions(
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success("Job queued successfully");
      }
    }
  ));

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Protected Server Components
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
