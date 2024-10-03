"use client";
import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const usdata = localStorage.getItem("usernameGrid");
    if (!usdata || usdata === "") {
      router.push("/login");
    } else {
      setOrgId(usdata);
      setLoading(false);
    }
  }, []);

  function logout() {
    localStorage.removeItem("usernameGrid");
    router.push("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <div>
          Inicio {orgId} <Button onPress={logout}>Cerrar sesion</Button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
