import { useEffect, useState } from "react";

import { listClasses } from "@/api/meteorites";

export function useClasses() {
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    listClasses()
      .then((response) => {
        if (active) {
          setClasses(response.classes);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return classes;
}
