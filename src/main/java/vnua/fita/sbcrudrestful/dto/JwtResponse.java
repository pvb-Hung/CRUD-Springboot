package vnua.fita.sbcrudrestful.dto;

public class JwtResponse {
    private String token;
    private String username;
    private int role;
    private Long user_id; // Thêm dòng này để lưu trữ user_id

    public JwtResponse(String token, String username, int role, Long user_id) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.user_id = user_id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
