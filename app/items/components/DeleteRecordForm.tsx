"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteRecord } from "@/app/action";
import { initialActionState } from "@/app/actionState";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-50"
    >
      {pending ? "삭제 중..." : "삭제"}
    </button>
  );
}

export default function DeleteRecordForm({ id }: { id: string }) {
  const [state, action] = useFormState(deleteRecord, initialActionState);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("정말 삭제할까요?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />

      {state.error && (
        <div className="mb-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {state.error}
        </div>
      )}

      <DeleteButton />
    </form>
  );
}
