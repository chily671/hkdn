"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
// ✅ Khởi tạo context
const AuthContext = createContext();

// ✅ Provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    let isMounted = true; // ✅ Tránh update state khi component unmount

    async function fetchUser() {
      setLoading(true); // ✅ Đặt loading thành true ngay khi bắt đầu fetch

      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // ✅ Gửi cookie trong request
        });

        if (!isMounted) return; // ✅ Kiểm tra nếu component đã unmount

        const data = await res.json();
        if (res.ok && data.InfoUser) {
          setUser(data.InfoUser);
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Lỗi khi xác thực:", error);
        setIsLogin(false);
      } finally {
        if (isMounted) setLoading(false); // ✅ Chỉ update state nếu component còn tồn tại
      }
    }

    fetchUser();

    return () => {
      isMounted = false; // ✅ Cleanup khi component unmount
    };
  }, []);

  // 🛠 Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify({ email }), { expires: 7 });
      // 🔹 Lưu token vào cookies
      setIsLogin(true);
      setToken(data.token);
      setUser({ email });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 🛠 Hàm đăng ký
  const register = async (email, password, username) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify({ email }), { expires: 7 });
      // Lưu state của user
      setToken(data.token);
      setUser({ email });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 🛠 Hàm đăng xuất
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // 🔹 Gửi cookie kèm theo request
    });

    Cookies.remove("token");
    Cookies.remove("user");

    setToken(null);
    setUser(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isLogin, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
