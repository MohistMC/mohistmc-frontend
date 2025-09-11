const PasswordStrengthBar = ({ password }: { password: string }) => {
    // 计算密码强度
    const calculateStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1; // 长度 >= 8
        if (/[A-Z]/.test(password)) strength += 1; // 包含大写字母
        if (/[a-z]/.test(password)) strength += 1; // 包含小写字母
        if (/\d/.test(password)) strength += 1; // 包含数字
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // 包含特殊字符
        return strength;
    };

    const strength = calculateStrength(password);
    const strengthPercentage = (strength / 5) * 100;

    // 根据强度设置进度条颜色
    const getProgressColor = (strength: number): string => {
        if (strength <= 1) return "bg-error"; // 弱
        if (strength <= 3) return "bg-warning"; // 中
        return "bg-success"; // 强
    };

    // 根据强度获取文本描述
    const getStrengthText = (strength: number): string => {
        if (strength <= 1) return "弱";
        if (strength <= 3) return "中";
        return "强";
    };

    return (
        <div className="mt-2">
            <div className="w-full bg-base-300 rounded-full h-2">
                <div
                    className={`h-2 rounded-full ${getProgressColor(strength)} transition-all duration-300`}
                    style={{ width: `${strengthPercentage}%` }}
                ></div>
            </div>
            <div className="text-sm mt-1 text-base-content/70">
                密码强度: {getStrengthText(strength)}
            </div>
        </div>
    );
};

export default PasswordStrengthBar
