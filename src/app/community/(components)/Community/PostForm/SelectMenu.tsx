"use client";

import React, { Fragment, useState, useEffect } from "react";
import CATEGORY_DATA from "@/constants/category";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Item {
  icon: string;
  category: string;
}

interface SelectedCategoryProps {
  setSelectedCategory: (value: string) => void;
  setValue: (name: "category", value: string) => void;
  initialCategory: string[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function SelectMenu({
  setSelectedCategory,
  setValue,
  initialCategory,
}: SelectedCategoryProps) {
  const [selected, setSelected] = useState<Item>({
    icon: initialCategory[0],
    category: initialCategory[1],
  });
  const handleChange = (item: Item) => {
    setSelected(item);
    setSelectedCategory(item.category);
    setValue("category", item.category);
  };

  useEffect(() => {
    if (initialCategory[1] !== "주제") {
      setValue("category", initialCategory[1]);
    }
  }, []);

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="w-[244px] relative border-grayscale-10">
            <Listbox.Button className="h-[40px] relative w-full cursor-default rounded-[10px] bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <div>{selected.icon}</div>
                <span
                  className={classNames(
                    selected.category === "주제"
                      ? "text-grayscale-40"
                      : "text-grayscale-80",
                    "ml-3 block truncate",
                  )}
                >
                  {selected.category}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {CATEGORY_DATA.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary-5" : "",
                        "text-grayscale-80 relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={item}
                  >
                    <>
                      <div className="flex items-center">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full">
                          {item.icon}
                        </div>
                        <span className="ml-3 block truncate">
                          {item.category}
                        </span>
                      </div>
                    </>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
export default SelectMenu;
