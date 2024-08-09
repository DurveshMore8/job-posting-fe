"use client";

import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import "./page.css";
import { fetchService } from "@/services/fetch_services";
import Button from "@/components/button";
import CategoryPopup from "@/components/popups/category-popup";
import { formatDate } from "@/services/date_service";

interface AdminJobCategoryProps {}

const AdminJobCategory: FunctionComponent<AdminJobCategoryProps> = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [category, setCategory] = useState<{ [key: string]: any }[]>([]);

  const fetchCategory = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/job/get-category-list`,
    });

    if (res.code == 200) {
      setCategory(res.data.categories);
    } else {
      alert(res.data.message);
    }
  };

  const addCategory = async (categoryName: string) => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/user/user-by-token`,
    });

    if (res.code == 200) {
      const res1 = await fetchService({
        method: "POST",
        endpoint: `/job/add-category`,
        data: {
          categoryName,
          email: res.data.email,
        },
      });

      if (res1.code == 200) {
        alert(res1.data.message);
        setPopup(false);
        fetchCategory();
      } else {
        alert(res1.data.message);
      }
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <main className="category">
      <Button value="Add Category" onClick={() => setPopup(true)} />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {category.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.categoryName}</td>
                <td>{formatDate(data.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CategoryPopup
        viewCategory={popup}
        setViewCategory={setPopup}
        createCategory={addCategory}
      />
    </main>
  );
};

export default AdminJobCategory;
