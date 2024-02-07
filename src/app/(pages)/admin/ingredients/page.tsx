"use client";
import Button from "@/app/components/generic/button";
import { LoadingPanel } from "@/app/components/generic/loadingPanel";
import { GeneratePages, PaginationPanel } from "@/app/components/generic/paginationPanel";
import FullScreenPopup from "@/app/components/popUps/schedulePopUp/fullScreenPopup";
import { IngredientType } from "@/app/types";
import {
  DeleteActionContext,
  useDeleteActionContext
} from "@/app/utilities/contexts/ingredients/DeleteActionContext";
import { ParseDate } from "@/app/utilities/globalMethods";
import axios from "axios";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { FaCheckCircle, FaEdit, FaEllipsisH, FaEye, FaTrash } from "react-icons/fa";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  function InitDelete(id: string) {
    setDeletePopUp(true);
    setSelectedId(id);
  }

  useEffect(() => {
    setLoading(true);
    setError("");
    getIngredients(page)
      .then((x) => {
        setIngredients([...x.ingredients]);
        setLoading(false);
        setPages(GeneratePages(page, x.resultsCount));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page]);

  async function getIngredients(page: number) {
    const baseUrl = window.location.origin;
    const result = await axios({
      method: "get",
      url: `${baseUrl}/api/ingredients`,
      params: {
        page: page ?? 1
      }
    });

    return result.data;
  }

  async function deleteIngredient(id: string) {
    const baseUrl = window.location.origin;
    const result = await axios({
      method: "delete",
      url: `${baseUrl}/api/ingredients/` + id
    });
    setDeletePopUp(false);

    getIngredients(page)
      .then((x) => {
        setIngredients([...x.ingredients]);
        setLoading(false);
        setPages(GeneratePages(page, x.resultsCount));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return result.data;
  }

  return (
    <>
      <DeleteActionContext.Provider value={InitDelete}>
        <section
          id="admin-ingredients-section"
          className="max-w-7xl bg-slate-500/30 mx-auto w-full p-4 md:p-8 rounded-xl shadow-md shadow-black/40 flex-col"
        >
          <div className="flex flex-col gap-4 overflow-visible ">
            <div className="flex justify-between place-items-center border-b-2 pb-6 border-violet-50/40 text-white">
              <h1 className="text-2xl font-semibold">
                {" "}
                <Link href={"/admin/"} className="opacity-70 hover:opacity-100">
                  Admin Panel
                </Link>{" "}
                / Ingredients
              </h1>
              <Link href={"/admin/ingredients/add"} target="_blank">
                <Button className="bg-indigo-500">Add New</Button>
              </Link>
            </div>
            <div className="rounded-lg bg-black/10 border-2 border-white/20 shadow-lg overflow-y-visible">
              <div className="flex w-full min-w-fit gap-4 place-items-center text-lg p-3 py-4 border-violet-50/40 bg-black/40 rounded-t-lg text-white shadow-sm">
                <span className="w-full min-w-54">Name</span>
                <span className="w-28 shrink-0 max-xs:hidden overflow-hidden">Vegan</span>
                <span className="w-28 shrink-0 max-xs:hidden">Vegetarian</span>
                <span className="w-28 shrink-0 max-xs:hidden">Created</span>
                <span className="w-10 shrink-0 "> </span>
              </div>
              <ul className="[&>*:nth-child(odd)]:bg-white/5">
                {loading && <LoadingPanel className="text-white" />}
                {!loading && ingredients.length ? (
                  ingredients.map((x) => <ListItem key={x._id} ingredient={x} />)
                ) : (
                  <></>
                )}
                {!loading && error && <div>{error}</div>}
              </ul>
            </div>
            <div className="w-full p-4 bg-black flex justify-center text-white gap-2 rounded-lg shadow-md">
              <PaginationPanel setPage={setPage} page={page} pages={pages} />
            </div>
          </div>
        </section>
        {deletePopUp && (
          <FullScreenPopup>
            <h2 className="text-white">Are you sure you want to delete this ingredient?</h2>
            <div className="flex justify-end gap-2 text-white mt-4">
              <Button className="bg-red-600" onClick={() => deleteIngredient(selectedId)}>
                Delete
              </Button>
              <Button
                className="bg-gray-800"
                onClick={() => {
                  setDeletePopUp(false);
                  setSelectedId("");
                }}
              >
                Cancel
              </Button>
            </div>
          </FullScreenPopup>
        )}
      </DeleteActionContext.Provider>
    </>
  );
}

function ListItem({ ingredient }: { ingredient: IngredientType }) {
  const ref = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <li
      className={`${dropdownOpen ? "!bg-gray-600" : ""} flex relative overflow-y-visible w-full min-w-fit gap-4 place-items-center p-3 font-normal hover:!bg-gray-600 border-violet-50/40 text-white`}
    >
      <span className="w-full min-w-54 cursor-pointer">
        <Link
          href={"/admin/ingredients/view/" + ingredient?._id}
          className="flex place-items-center gap-1"
          target="_blank"
        >
          {ingredient.name}
        </Link>
      </span>
      <span className="w-28 shrink-0 max-xs:hidden overflow-hidden overflow-ellipsis">
        {ingredient.vegan && <FaCheckCircle className="w-5 h-5 fill-green-500" />}
      </span>
      <span className="w-28 shrink-0 max-xs:hidden overflow-hidden overflow-ellipsis">
        {ingredient.vegetarian && <FaCheckCircle className="w-5 h-5 fill-green-500" />}
      </span>
      <span className="w-28 shrink-0 max-xs:hidden">
        {ingredient?.createdAt ? ParseDate(ingredient?.createdAt) : "Unknown"}
      </span>
      <div
        className="flex place-items-center p-2 rounded-lg w-10 shrink-0 opacity-70 hover:opacity-100 cursor-pointer"
        onMouseDown={() => setDropdownOpen((x) => !x)}
        ref={buttonRef}
      >
        <FaEllipsisH className="w-5 h-5" />
      </div>
      <OptionsDropdown
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        refValue={ref}
        id={ingredient._id ?? ""}
      />
    </li>
  );
}

function OptionsDropdown({
  dropdownOpen,
  setDropdownOpen,
  refValue,
  id
}: {
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  refValue: any;
  id: string;
}) {
  const initDelete = useDeleteActionContext();

  return (
    <ul
      className={`${dropdownOpen ? "block" : "hidden"} bg-[#13171c] w-44 h-fit absolute right-0 -bottom-44 z-20 rounded-lg shadow-md border-2 border-white/30`}
      ref={refValue}
    >
      <li className="p-4 hover:bg-slate-400/10 cursor-pointer select-none">
        <Link
          href={"/admin/ingredients/view/" + id}
          className="flex place-items-center gap-1"
          target="_blank"
        >
          <FaEye /> View
        </Link>
      </li>
      <li className="p-4 hover:bg-slate-400/10 cursor-pointer select-none">
        <Link
          href={"/admin/ingredients/edit/" + id}
          className="flex place-items-center gap-1"
          target="_blank"
        >
          <FaEdit /> Edit
        </Link>
      </li>
      <li
        className="p-4 hover:bg-slate-400/10 cursor-pointer select-none"
        onClick={() => {
          initDelete(id);
          setDropdownOpen(false);
        }}
      >
        <div className="flex place-items-center gap-1">
          <FaTrash className="h-4" /> Delete
        </div>
      </li>
    </ul>
  );
}
